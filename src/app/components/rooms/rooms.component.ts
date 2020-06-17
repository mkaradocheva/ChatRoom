import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { Room } from '../shared/models/room.model';
import { Subscription } from 'rxjs';
import { ListRoom } from '../shared/models/list-rooms.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})

export class RoomsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [ 'name', 'description', 'button' ];
  dataSource = new MatTableDataSource<ListRoom>();
  allRoomsSubscription: Subscription;

  constructor(private roomService: RoomsService) { }

  ngOnInit(): void {
    this.roomService.fetchAllRooms();
    this.allRoomsSubscription = this.roomService.allRoomsChanged.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(){
    this.allRoomsSubscription.unsubscribe();
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim();
  }

  enterRoom(id: string){
    this.roomService.fetchRoomById(id);
  }
}
