import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { Subscription } from 'rxjs';
import { ListRoom } from '../shared/models/list-rooms.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})

export class RoomsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'name', 'description', 'button' ];
  dataSource = new MatTableDataSource<ListRoom>();
  allRoomsSubscription: Subscription;

  isAuth: boolean = false;
  isAuthSub: Subscription;

  constructor(private roomService: RoomsService,
     private authService: AuthService,
     private router: Router
    ) { }

  ngOnInit(): void {
    this.isAuthSub = this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;
    });

    this.roomService.fetchAllRooms();
    this.allRoomsSubscription = this.roomService.allRoomsChanged.subscribe((data) => {
      this.dataSource.data = data;
    });

    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(){
    this.allRoomsSubscription.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  enterRoom(name: string){
    if(this.isAuth){
      this.roomService.fetchRoomByName(name);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
