export class appError extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;

        console.log("error log:", this.status, this.message)
    }
}