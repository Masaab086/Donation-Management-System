type responseStatus = "success" | "fail" | "error";
type code =
  | "record_created"
  | "record_updated"
  | "record_deleted"
  | "record_founded"
  | "user_created"
  | "email_taken"
  | "invalid_id"
  | "invalid_credintials"
  | "internal_server_error"
  | "record_not_founded"
  | "unauthenticated"
  | "already_logged_in"
  | "login_success";

export interface responseObject {
  status: responseStatus;
  code: code;
  data?: unknown;
  message?: string;
}
