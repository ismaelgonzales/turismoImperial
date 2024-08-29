import { Component, Input, OnInit } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { IconNames } from '../../../enum';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [NgIconComponent],
  template : '<ng-icon [svg]="getIcon(icon)"/>'
})
export class IconsComponent  {
  @Input({ required: true }) icon: IconNames = IconNames.HeroUsers;

  private iconMap: { [key in IconNames]: any } = {
    [IconNames.HeroUsers]: heroUsers,
  };

  public getIcon(iconName: IconNames): any {
    return this.iconMap[iconName] || null;
  }
  
}
