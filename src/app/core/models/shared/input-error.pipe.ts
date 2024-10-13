import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputError',
  standalone: true
})
export class InputErrorPipe implements PipeTransform {

  transform(value: any, args: any[]): string {
    let res: string = "";

    if (value !== null) {
      if (value['required'] == true) {
        res = `Campo ${args[0]} requerido`;
        return res;
      }
      let haha = Object.getOwnPropertyNames(value).sort().toString();
      let val_ = haha.split(",");
      val_.forEach(x => {
        switch (x) {
          case "minlength": res = `${res} No cumple con el minimo de caracteres ${value.minlength.requiredLength} || `; break;
          case "maxlength": res = `${res} No cumple con el máximo de caracteres ${value.maxlength.requiredLength} || `; break;
          case "pattern": res = `${res} No cumple con el formato establecido:  ${args[1]} || `; break;
          case "email": res = `${res} No cumple con el formato de correos: ejemplo miemail@gmail.com || `; break;
        }

      });

    }
    return res;
  }
}
