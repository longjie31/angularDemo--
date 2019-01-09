import {Injectable} from '@angular/core';
import {HEROES} from './mock-heroes';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  // handleError会在很多服务间共享，所以进行了通用化，返回错误处理函数
  // 处理失败的http操作，让应用程序继续，参数operation失败操作的名称，参数result可观察结果返回的可选值
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // 将错误发送到远程日志记录
      console.error(error); // 用控制台日志代替

      // 更好的转换用户消费的错误
      this.log(`${operation} failed: ${error.message}`);

      // 让应用程序通过返回空值来保持运行
      return of(result as T);
    };
  }

  constructor(private messageService: MessageService,
              private http: HttpClient) {
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('英雄服务得到的英雄人物');
    // return of(HEROES);
    // 使用管道处理结果，给它一个catchError操作符
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      // tap是RxJs的操作符，查看可观察对象的值，并做一些事，把它们传出去，不会改变值本身
      tap(_ => this.log('得到的英雄')),
      // 拦截失败的可观察对象，它把错误对象传给错误处理器，错误处理器会处理错误
      catchError(this.handleError('getHeroes', []))
      // handleError操作错误这个方法会报告这个错误，并返回无害的结果（安全值）
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`获取英雄ID=${id}`)),
      catchError(this.handleError <Hero>(`得到英雄ID=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`英雄服务：${message}`);
  }
}
