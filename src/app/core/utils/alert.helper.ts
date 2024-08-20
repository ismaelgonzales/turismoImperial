import Swal from 'sweetalert2';
import { IAlertRequest } from '../interfaces';

export class AlertHelper {
    public static SimpleMessageService(message?: IAlertRequest) {
        Swal.fire({
            position: 'center',
            html: `
      <div class="mt-4 text-lg">
          <p class="font-bold">${message?.title}</p>
          <p>${message?.text}</p>
      </div>
      `,
            showCloseButton: true,
            showConfirmButton: message?.showButtonConfirm,
            confirmButtonText:
                message?.confirmButtonText ?? 'Volver al formulario',
            buttonsStyling: false,
            customClass: {
                actions: 'col-12 ',
                popup: 'rounded-border',
                confirmButton:
                    'bg-gray-800 px-5 py-3 rounded-border w-full m-0 text-white cursor-pointer',
            },
        });
    }

    public static SuccessMessageV2Service(message?: IAlertRequest) {
        Swal.fire({
            position: 'center',
            html: `
      <div class="mt-6 text-lg">
          <p class="font-bold">${message?.title}</p>
          <svg style="font-size:100px;color:green" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
          </svg>
      </div>
      `,
            showCloseButton: true,
            showConfirmButton: false,
            customClass: {
                container: 'm-0 p-0',
                popup: 'rounded-border',
            },
        });
    }

    public static ErrorMessageV2Service(message?: IAlertRequest) {
        Swal.fire({
            position: 'center',
            html: `
      <div class="mt-6 text-lg">
          <p class="font-bold">${message?.title}</p>
          <svg style="font-size:100px;color:green" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
          </svg>
      </div>
      `,
            showCloseButton: true,
            showConfirmButton: false,
            customClass: {
                container: 'm-0 p-0',
                popup: 'rounded-border',
            },
        });
    }

    public static async SimpleConfirmRequest(
        message?: IAlertRequest,
    ): Promise<boolean> {
        const result = await Swal.fire({
            position: 'center',
            title: message?.title,
            confirmButtonText: message?.confirmButtonText ?? 'Si',
            cancelButtonText: message?.cancelButtonText ?? 'No',
            showCloseButton: true,
            showConfirmButton: true,
            showCancelButton: true,
            buttonsStyling: false,
            customClass: {
                popup: 'rounded-border p-10',
                title: 'text-lg mt-4',
                actions: 'col-12 flex justify-content-evenly ',
                confirmButton:
                    'bg-gray-600 text-white font-semibold col-4 px-10 py-2 rounded-border border-none cursor-pointer',
                cancelButton:
                    'bg-gray-200 text-gray-900 font-semibold col-4 px-10 py-2 rounded-border border-none cursor-pointer',
            },
        });

        return result.isConfirmed;
    }

    public static ValidateRequest(menssage?: IAlertRequest) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: menssage?.title ?? 'Validación',
            text: menssage?.text ?? 'Verifique campos requeridos.',
            showConfirmButton: true,
        });
    }

    public static ErrorService(menssage?: IAlertRequest) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocurrio un error.',
            text: 'Comunicarse con el area de ti.',
            showConfirmButton: true,
        });
    }

    public static ValidationService(menssage?: IAlertRequest) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Alerta:',
            text: menssage?.text,
            showConfirmButton: true,
        });
    }

    public static SuccessService(menssage: IAlertRequest) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: menssage.title ?? 'Confirmación',
            text: menssage.text,
            showConfirmButton: true,
        });
    }

    public static AlertService(menssage: IAlertRequest) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: menssage.title,
            text: menssage.text,
            showConfirmButton: true,
        });
    }

    public static async ConfirmService(
        menssage: IAlertRequest,
    ): Promise<boolean> {
        const result = await Swal.fire({
            position: 'center',
            icon: 'warning',
            title: menssage.title,
            text: menssage.text,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
        });

        return result.isConfirmed;
    }
}
