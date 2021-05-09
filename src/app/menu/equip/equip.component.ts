import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/dialog.service';
import { NotificationService } from 'src/app/notification.service';
import { Region } from 'src/app/region';
import { RegionService } from 'src/app/region.service';
import { Site } from 'src/app/site';
import { SiteService } from 'src/app/site.service';

@Component({
  selector: 'app-equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.css']
})
export class EquipComponent implements OnInit {

  regions: Region[];
  sites: Site[];

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['nom', 'action'];

  listData2: MatTableDataSource<any>;
  displayedColumns2: string[] = ['nom', 'action'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;

  searchKey: string;
  searchKey2: string;

  constructor(private regionService: RegionService,
    private siteService: SiteService,
    private router:Router,
    private dialogService: DialogService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getRegion();
    this.getSite();
  }

  private getRegion() {
    this.regionService.getRegionList().subscribe(data => {
      this.regions = data;
      this.listData = new MatTableDataSource(this.regions);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      
    }
 
    )
  }

  private getSite() {
    this.siteService.getSiteList().subscribe(data => {
      this.sites = data;
      this.listData2 = new MatTableDataSource(this.sites);
      this.listData2.sort = this.sort1;
      this.listData2.paginator = this.paginator1;
      
    }
 
    )
  }

  detail(id: number){
    this.router.navigate(['/detailregion', id]) ;
  }
  detailSite(id:number){
    this.router.navigate(['/detailsite', id]) ;
  }

  ajouterSite(id:number){
    this.router.navigate(['/ajoutersite', id]) ;
  }

  deleteRegion(id:number){
  
    this.dialogService.openConfirmDialog("Voulez-vous Supprimer cet region ?")
    .afterClosed().subscribe(res =>{
      if(res){
        this.regionService.deleteRegion(id).subscribe(data => {
          console.log(data);
          this.getRegion();
        })
       
         this.notificationService.warn('! supprimer avec succes '); 

      }
      
    })
 
  }

  deleteSite(id:number){
    

    this.dialogService.openConfirmDialog("Voulez-vous Supprimer ce Site ?")
    .afterClosed().subscribe(res =>{
      if(res){
        this.siteService.deleteSite(id).subscribe(data => {
          console.log(data);
          this.getSite();
        })
       
         this.notificationService.warn('! supprimer avec succes '); 

      }
      
    })
  }

  ajouterequip(id:number){
    this.router.navigate(['/ajouterequip', id]) ;

  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();

  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();

  }

  onSearchClear2(){
    this.searchKey2="";
    this.applyFilter2();

  }

  applyFilter2(){
    this.listData2.filter = this.searchKey2.trim().toLowerCase();

  }
}
