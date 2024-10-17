import { UsuarioResponse } from './usuario-response.model';

export class RegisterResponse {
    success: boolean = false;
    token: string = '';
    user: UsuarioResponse | null = null;
}
