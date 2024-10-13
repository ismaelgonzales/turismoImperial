import { UserResponse } from "./user-response.model";

export class LoginResponse {
    success: boolean = false;
    token: string = "";
    user: UserResponse | null = null;
}