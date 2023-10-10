import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../Shared/Services/loader-service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  // isLoading in service byb2a true or false f b listen 3leeh byb2a eh 3l4an a3rf al loading show wla hide
  isLoading: Subject<boolean> = this._loaderService.isLoading;

  constructor(private _loaderService : LoaderService){}
}
