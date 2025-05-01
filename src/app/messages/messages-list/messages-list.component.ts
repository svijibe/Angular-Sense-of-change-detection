import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class MessagesListComponent implements OnInit{

  //messages = input.required<string[]>();
  private messagesService = inject (MessagesService);

  //to run change detection manually
  private cdRef = inject(ChangeDetectorRef);
  private destroyRef = inject (DestroyRef);

  // messages = this.messagesService.allMessages;
  // get messages() {
  //   return this.messagesService.allMessages;
  // }
  messages: string[] = [];

  ngOnInit(): void {
    const subscription =  this.messagesService.messages$.subscribe((messages) => {
        this.messages = messages;
      this.cdRef.markForCheck(); //Triggering change detection manually
    });
    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    });
  }
  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
