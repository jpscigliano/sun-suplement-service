export enum ErrorCode {
    //400 Bad Request
    Validation_InvalidInput = 4001,
    Validation_BodyRequired = 4002,

    //401 Auth
    Authentication_UserNotFound = 4010,
    Authentication_InvalidSession = 4011,
    Authentication_SessionExpired = 4012,

    Authorization_Missing = 4013,
    Authorization_NotAuthorized = 4014,
    Authorization_TokenExpired = 4015,
    Authorization_InvalidToken = 4016,

    //404
    NotFound_Suplements = 4041,

    // 500
    General_InternalServerError = 5000,
    General_BadRequest = 5001,
    General_Forbidden = 5002,
}
