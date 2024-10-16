import { UserResponse } from './user-response.model';
import { UsuarioResponse } from './usuario-response.model';

export class LoginResponse {
    success: boolean = false;
    token: string = '';
    user: UsuarioResponse | null = null;
}