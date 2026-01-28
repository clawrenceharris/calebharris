import {
    AppError,
    AppErrorCode,
    AuthenticationError,
    ErrorCategory,
    ErrorSeverity,
    NetworkError,
  } from "@/types/errors";
  
  // Centralized error message mapping
  export const ERROR_MESSAGES: Record<AppErrorCode, string> = {
    // Authentication
    [AppErrorCode.AUTH_INVALID_CREDENTIALS]:
      "Invalid email or password. Please try again.",
    [AppErrorCode.AUTH_USER_NOT_FOUND]:
      "No account found with this email address.",
    [AppErrorCode.AUTH_EMAIL_NOT_CONFIRMED]:
      "Please check your email and click the confirmation link.",
    [AppErrorCode.AUTH_PASSWORD_TOO_WEAK]:
      "Password must be at least 8 characters with numbers and symbols.",
    [AppErrorCode.AUTH_EMAIL_ALREADY_EXISTS]:
      "An account with this email already exists.",
    [AppErrorCode.AUTH_SESSION_EXPIRED]:
      "Your session has expired. Please sign in again.",
    [AppErrorCode.AUTH_RATE_LIMITED]:
      "Too many attempts. Please wait a few minutes before trying again.",
  
    // Sessions
    [AppErrorCode.SESSION_NOT_FOUND]:
      "Session not found. It may have been deleted or expired.",
    [AppErrorCode.SESSION_ALREADY_STARTED]: "This session has already started.",
    [AppErrorCode.SESSION_CAPACITY_FULL]: "This session is at full capacity.",
    [AppErrorCode.SESSION_ACCESS_DENIED]:
      "You don't have permission to access this session.",
  
    // Check-in
    [AppErrorCode.CHECKIN_ALREADY_CHECKED_IN]:
      "You're already checked in to this session.",
    [AppErrorCode.CHECKIN_SESSION_NOT_ACTIVE]:
      "This session is not currently active for check-ins.",
    [AppErrorCode.CHECKIN_INVALID_CODE]:
      "Invalid session code. Please check the code and try again.",
  
    // Network
    [AppErrorCode.NETWORK_OFFLINE]:
      "You appear to be offline. Please check your connection.",
    [AppErrorCode.NETWORK_TIMEOUT]: "Request timed out. Please try again.",
    [AppErrorCode.NETWORK_SERVER_ERROR]:
      "Server error. Please try again in a moment.",
  
    // Validation
    [AppErrorCode.VALIDATION_REQUIRED_FIELD]: "This field is required.",
    [AppErrorCode.VALIDATION_INVALID_EMAIL]:
      "Please enter a valid email address.",
    [AppErrorCode.VALIDATION_INVALID_FORMAT]:
      "Invalid format. Please check your input.",
  
    // Generic
    [AppErrorCode.UNKNOWN_ERROR]: "Something went wrong. Please try again.",
    [AppErrorCode.PERMISSION_DENIED]:
      "You don't have permission to perform this action.",
    [AppErrorCode.RESOURCE_NOT_FOUND]: "The requested resource was not found.",
  };
  
  export function getUserErrorMessage(error: unknown): string {
    return normalizeError(error).userMessage;
  }
  
  // Central error normalization function
  export function normalizeError(error: unknown): AppError {
    // Already normalized
    if (error instanceof AppError) {
      return error;
    }
  
    // Supabase auth errors
    if (error && typeof error === "object" && "message" in error) {
      const supabaseError = error as {
        code: string;
        message: string;
        status?: number;
      };
  
      // Map common Supabase errors to our error codes
      if (supabaseError.message.includes("Invalid login credentials")) {
        return new AuthenticationError(
          AppErrorCode.AUTH_INVALID_CREDENTIALS,
          ERROR_MESSAGES[AppErrorCode.AUTH_INVALID_CREDENTIALS]
        );
      }
  
      if (supabaseError.message.includes("Email not confirmed")) {
        return new AuthenticationError(
          AppErrorCode.AUTH_EMAIL_NOT_CONFIRMED,
          ERROR_MESSAGES[AppErrorCode.AUTH_EMAIL_NOT_CONFIRMED]
        );
      }
  
      if (supabaseError.message.includes("User already registered")) {
        return new AuthenticationError(
          AppErrorCode.AUTH_EMAIL_ALREADY_EXISTS,
          ERROR_MESSAGES[AppErrorCode.AUTH_EMAIL_ALREADY_EXISTS]
        );
      }
  
      // Database errors
      if (supabaseError.message.includes("duplicate key")) {
        // Duplicate key is a database constraint violation (resource conflict)
        return new AppError(
          AppErrorCode.UNKNOWN_ERROR,
          ErrorCategory.DATABASE,
          ErrorSeverity.MEDIUM,
          "This resource already exists. Please try a different one.",
          false,
          { originalMessage: supabaseError.message }
        );
      }
  
      if (supabaseError.message.includes("foreign key constraint")) {
        return new AppError(
          AppErrorCode.RESOURCE_NOT_FOUND,
          ErrorCategory.DATABASE,
          ErrorSeverity.MEDIUM,
          "A required resource is missing. Please refresh and try again.",
          true,
          { originalMessage: supabaseError.message }
        );
      }
  
      // PostgREST (PGRST) specific errors (e.g., PGRST204, PGRST401, PGRST429)
      const pgrstMatch = supabaseError.code?.match(/PGRST(\d{3})/i);
      if (pgrstMatch) {
        const pgrstCode = Number(pgrstMatch[1]);
  
        if (pgrstCode === 401 || pgrstCode === 403) {
          return new AppError(
            AppErrorCode.PERMISSION_DENIED,
            ErrorCategory.AUTHORIZATION,
            ErrorSeverity.HIGH,
            ERROR_MESSAGES[AppErrorCode.PERMISSION_DENIED],
            false,
            { originalMessage: supabaseError.message, pgrstCode }
          );
        }
  
        if (pgrstCode === 404 || pgrstCode === 204) {
          return new AppError(
            AppErrorCode.RESOURCE_NOT_FOUND,
            ErrorCategory.NETWORK,
            ErrorSeverity.MEDIUM,
            ERROR_MESSAGES[AppErrorCode.RESOURCE_NOT_FOUND],
            false,
            { originalMessage: supabaseError.message, pgrstCode }
          );
        }
  
        if (pgrstCode === 429) {
          return new AppError(
            AppErrorCode.AUTH_RATE_LIMITED,
            ErrorCategory.AUTHENTICATION,
            ErrorSeverity.MEDIUM,
            ERROR_MESSAGES[AppErrorCode.AUTH_RATE_LIMITED],
            false,
            { originalMessage: supabaseError.message, pgrstCode }
          );
        }
  
        if (pgrstCode >= 500) {
          return new NetworkError(
            ERROR_MESSAGES[AppErrorCode.NETWORK_SERVER_ERROR],
            true
          );
        }
  
        // Fallback for unhandled PGRST codes
        return new AppError(
          AppErrorCode.UNKNOWN_ERROR,
          ErrorCategory.EXTERNAL_API,
          ErrorSeverity.MEDIUM,
          supabaseError.message,
          false,
          { originalMessage: supabaseError.message, pgrstCode }
        );
      }
  
      // Textual permission checks
      if (supabaseError.message.includes("permission denied")) {
        return new AppError(
          AppErrorCode.PERMISSION_DENIED,
          ErrorCategory.AUTHORIZATION,
          ErrorSeverity.HIGH,
          ERROR_MESSAGES[AppErrorCode.PERMISSION_DENIED],
          false,
          { originalMessage: supabaseError.message }
        );
      }
  
      // Network errors
      if (supabaseError.status && supabaseError.status >= 500) {
        return new NetworkError(
          ERROR_MESSAGES[AppErrorCode.NETWORK_SERVER_ERROR],
          true
        );
      }
  
      if (supabaseError.status === 404) {
        return new AppError(
          AppErrorCode.RESOURCE_NOT_FOUND,
          ErrorCategory.NETWORK,
          ErrorSeverity.MEDIUM,
          ERROR_MESSAGES[AppErrorCode.RESOURCE_NOT_FOUND],
          false,
          { originalMessage: supabaseError.message }
        );
      }
  
      if (supabaseError.status === 403 || supabaseError.status === 401) {
        return new AppError(
          AppErrorCode.PERMISSION_DENIED,
          ErrorCategory.AUTHORIZATION,
          ErrorSeverity.HIGH,
          ERROR_MESSAGES[AppErrorCode.PERMISSION_DENIED],
          false,
          { originalMessage: supabaseError.message }
        );
      }
    }
  
    // Network/fetch errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return new NetworkError(ERROR_MESSAGES[AppErrorCode.NETWORK_OFFLINE], true);
    }
  
    // Generic JavaScript errors
    if (error instanceof Error) {
      return new AppError(
        AppErrorCode.UNKNOWN_ERROR,
        ErrorCategory.SYSTEM,
        ErrorSeverity.MEDIUM,
        ERROR_MESSAGES[AppErrorCode.UNKNOWN_ERROR],
        true,
        { originalMessage: error.message }
      );
    }
  
    // Fallback for unknown error types
    return new AppError(
      AppErrorCode.UNKNOWN_ERROR,
      ErrorCategory.SYSTEM,
      ErrorSeverity.MEDIUM,
      ERROR_MESSAGES[AppErrorCode.UNKNOWN_ERROR],
      true,
      { originalError: String(error) }
    );
  }
  
  /**
   * Infers user-friendly context about what operation failed
   * @param error - The error that occurred
   * @param mutationContext - Optional context about the mutation (e.g., mutation key, operation name)
   */
  export function inferErrorContext(
    error: AppError,
    mutationContext?: { mutationKey?: unknown[]; operation?: string }
  ): string {
    if (mutationContext?.operation) {
      return mutationContext.operation;
    }
  
    if (mutationContext?.mutationKey) {
      const key = mutationContext.mutationKey;
      // Extract operation name from mutation key (e.g., ["createSession"] -> "create session")
      if (Array.isArray(key) && key.length > 0 && typeof key[0] === "string") {
        const operation = key[0]
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()
          .trim();
        return operation;
      }
    }
  
    // Fallback based on error category
    switch (error.category) {
      case ErrorCategory.AUTHENTICATION:
        return "sign in";
      case ErrorCategory.AUTHORIZATION:
        return "access this resource";
      case ErrorCategory.VALIDATION:
        return "validate the form";
      case ErrorCategory.NETWORK:
        return "connect to the server";
      case ErrorCategory.DATABASE:
        return "save the data";
      default:
        return "complete this action";
    }
  }
  
  /**
   * Returns detailed explanation for error modal
   * Provides suggestions for what the user can do
   */
  export function getUserFriendlyExplanation(error: AppError): {
    explanation: string;
    suggestions: string[];
  } {
    const suggestions: string[] = [];
  
    switch (error.code) {
      case AppErrorCode.NETWORK_OFFLINE:
        return {
          explanation:
            "You appear to be offline. Please check your internet connection and try again.",
          suggestions: [
            "Check your internet connection",
            "Try refreshing the page",
            "Wait a moment and try again",
          ],
        };
  
      case AppErrorCode.NETWORK_TIMEOUT:
        return {
          explanation:
            "The request took too long to complete. This might be due to a slow connection or server issues.",
          suggestions: [
            "Check your internet connection",
            "Wait a moment and try again",
            "If the problem persists, contact support",
          ],
        };
  
      case AppErrorCode.NETWORK_SERVER_ERROR:
        return {
          explanation:
            "Our servers encountered an error processing your request.",
          suggestions: [
            "Wait a moment and try again",
            "Refresh the page",
            "If the problem persists, contact support",
          ],
        };
  
      case AppErrorCode.AUTH_SESSION_EXPIRED:
        return {
          explanation:
            "Your session has expired for security reasons. Please sign in again.",
          suggestions: [
            "Sign in again to continue",
            "Make sure cookies are enabled",
          ],
        };
  
      case AppErrorCode.PERMISSION_DENIED:
        return {
          explanation:
            "You don't have permission to perform this action. This might be because you're not signed in or don't have the required access.",
          suggestions: [
            "Check that you're signed in",
            "Verify you have the necessary permissions",
            "Contact an administrator if you believe this is an error",
          ],
        };
  
      case AppErrorCode.RESOURCE_NOT_FOUND:
        return {
          explanation:
            "The requested resource could not be found. It may have been deleted or moved.",
          suggestions: [
            "Refresh the page",
            "Navigate back and try again",
            "Check if the resource still exists",
          ],
        };
  
      case AppErrorCode.VALIDATION_REQUIRED_FIELD:
      case AppErrorCode.VALIDATION_INVALID_EMAIL:
      case AppErrorCode.VALIDATION_INVALID_FORMAT:
        return {
          explanation:
            "The form contains invalid data. Please check your input and try again.",
          suggestions: [
            "Review the form fields highlighted in red",
            "Make sure all required fields are filled",
            "Check that email addresses and formats are correct",
          ],
        };
  
      default:
        if (error.canRetry) {
          suggestions.push("You can try again");
        }
        suggestions.push("If the problem persists, please report it");
  
        return {
          explanation: error.userMessage || ERROR_MESSAGES[error.code],
          suggestions:
            suggestions.length > 0 ? suggestions : ["Please try again"],
        };
    }
  }
  