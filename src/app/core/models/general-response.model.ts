export class GeneralResponse<T> {
    success: boolean = false;
    showAlert: boolean = false;
    title: string = "";
    message: string = "";
    content: T | null = null;
}