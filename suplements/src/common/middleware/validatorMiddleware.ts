import middy from '@middy/core';
import { ValidationError, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ErrorDto } from '../../dto/common/error.dto';
import { ErrorCode } from '../../error/errorCodes';
import ResponseHandler from '../../dto/common/response-handler';

interface IMiddlewareOptions<T extends object> {
    classType: ClassType<T>;
}

type ClassType<T> = new (...args: any[]) => T;

export class ClassValidatorMiddleware<T extends object>
    implements middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult>
{
    public static create<S extends object>(options: IMiddlewareOptions<S>): ClassValidatorMiddleware<S> {
        return new ClassValidatorMiddleware(options);
    }
    /** Creates a new JSON error handler middleware */
    constructor(options: IMiddlewareOptions<T>) {
        this.classType = options.classType;
    }
    private readonly classType: ClassType<T>;

    before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
        try {
            if (!request.event.body) {
                let errorResponse: ErrorDto = {
                    code: ErrorCode.Validation_BodyRequired,
                    message: 'Request body is required',
                };
                return {
                    statusCode: 400,
                    body: JSON.stringify(errorResponse),
                };
            }

            const transformedBody = await plainToInstance(this.classType, JSON.parse(request.event.body!));
            const errors = await validate(transformedBody, { forbidUnknownValues: true });

            if (errors.length > 0) {
                console.log('validation failed. Errors: ', errors);

                const validationErrors = errors.map((error: ValidationError) => {
                    return {
                        field: error.property,
                        value: error.value,
                        constraints: error.constraints,
                    };
                });

                let errorResponse: ErrorDto = {
                    code: ErrorCode.Validation_InvalidInput,
                    message: 'Validation failed',
                    extra: validationErrors,
                };
                return {
                    statusCode: 400,
                    body: JSON.stringify(errorResponse),
                };
            }
        } catch (err) {
            return ResponseHandler.error(err);
        }
    };
}

export default ClassValidatorMiddleware.create;
