export class Logger {
    private static format(level: string, message: string): string {
        return `[${new Date().toISOString()}] [${level}] ${message}`;
    }

    static info(message: string): void {
        console.log(this.format("INFO", message));
    }

    static warn(message: string): void {
        console.warn(this.format("WARN", message));
    }

    static error(message: string): void {
        console.error(this.format("ERROR", message));
    }

    static debug(message: string): void {
        console.debug(this.format("DEBUG", message));
    }
}