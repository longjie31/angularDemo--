import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {
  }

  // 搜索项推送到可观察的流中
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // 每次按键后等待300毫秒，再考虑接下来的程序
      debounceTime(300),
      // 如果与上个参数相同，就不执行接下来的语句
      distinctUntilChanged(),
      // 每次参数变化切换到新的可观察对象搜索
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
