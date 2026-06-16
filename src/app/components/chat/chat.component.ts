import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages: { role: string; content: string }[] = [
    { role: 'assistant', content: 'היי! אני אורי, עוזר המתנות הדיגיטלי שלכם. מחפשים מתנה מיוחדת?' }
  ];
  input = '';
  loading = false;
  isOpen = false;

  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) {}

  send() {
    if (!this.input.trim() || this.loading) return;
    const msg = this.input;
    this.input = '';
    this.loading = true;
    this.messages.push({ role: 'user', content: msg });

    this.chatService.send(msg, this.messages.slice(0, -1)).subscribe({
      next: res => {
        this.messages.push({ role: 'assistant', content: res.reply });
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  onKey(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
  }
}
