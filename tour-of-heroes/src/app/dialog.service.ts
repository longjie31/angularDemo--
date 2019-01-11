import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';


// 异步模态对话服务DialogService通过伪造服务，使此应用更容易测试
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() {
  }
  // 要求用户确认操作，message解释操作和选择
  // 返回可观察对象，解析为真等于确认，假等于取消
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?');
    return of(confirmation);
  }
}
