export interface DateTimeFormatOptions {
    day?: "numeric" | "2-digit";
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
    year?: "2-digit" | "numeric";
    hour?: "2-digit" | "numeric";
    minute?: "2-digit" | "numeric";
    hour12?: boolean;
}