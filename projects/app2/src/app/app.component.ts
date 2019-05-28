import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

import { AppService } from './services/app.service';
import { SimulationService } from './services/simulation.service';

export class Message {
    constructor(
        public sender: string,
        public content: string,
        public isBroadcast = false,
    ) { }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    @ViewChild('canvas') public canvas: ElementRef;
    public subscription: any;
    public showLoader = true;

    public serverMessages = new Array<Message>();

    public clientMessage = '';
    public isBroadcast = false;
    public sender = '';

    private socket$: WebSocketSubject<Message>;

    constructor(
      private appService: AppService,
      private simulationService: SimulationService
    ) {

        this.socket$ = new WebSocketSubject('ws://localhost:8999');

        this.socket$
            .subscribe(
            (message) => {
              this.serverMessages.push(message);
            },
            (err) => {console.error(err);},
            () => {console.warn('Completed!');}
            );
    }

    ngAfterViewInit(): void {
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      this.appService.createPlayGround(canvasEl);
      this.subscription = this.appService
      .getImageLoadEmitter()
      .subscribe(item => {
        this.showLoader = false;
        this.simulationService.startGameLoop();
      });
    }

    @HostListener('document:keydown', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
      this.appService.moveEntity(event, 'keydown');
    }

    @HostListener('document:keyup', ['$event'])
    onKeyupHandler(event: KeyboardEvent) {
      this.appService.moveEntity(event, 'keyup');
    }

    public toggleIsBroadcast(): void {
        this.isBroadcast = !this.isBroadcast;
    }

    public send(): void {
        const message = new Message(this.sender, this.clientMessage, this.isBroadcast);

        this.serverMessages.push(message);
        this.socket$.next(message);
        this.clientMessage = '';
    }

}
