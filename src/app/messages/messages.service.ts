import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  // private messages = signal<string[]>([]);
  // allMessages = this.messages.asReadonly();
  // addMessage (message: string){
  //   this.messages.update((prevMessage) => [...prevMessage, message]);
  // }
  private messages : string[] = [];
  get allMessages() {
    return [...this.messages];
  } 

  addMessage (message: string){
    this.messages = [...this.messages, message];
  }
}
