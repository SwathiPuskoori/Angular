import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userName = input.required<string>();
  // userId = input.required<string>();
  message = input.required<string>();
  // private activatedRoute = inject(ActivatedRoute);
  // private userService = inject(UsersService);
  // private destroyRef = inject(DestroyRef);
  // userName = computed(()=> this.userService.users.find(u => u.id === this.userId())?.name)

  // ngOnInit() {
  //   console.log('input data',this.message());
  //   console.log(this.activatedRoute);
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) =>
  //       (this.userName =
  //         this.userService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name || ''),
  //   });
  //   this.destroyRef.onDestroy(()=> subscription.unsubscribe());
  // }
}
export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot)=>{
  const userService = inject(UsersService);
  const userName = userService.users.find((u) => u.id === activatedRoute.paramMap.get('userId'))
  ?.name ||'';
  return userName;
};

export const resolveTitle: ResolveFn<string> =(activatedRoute, routerState)=>{
  return resolveUserName(activatedRoute,routerState)+'\'s tasks';
}