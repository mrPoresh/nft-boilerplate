import { Injectable } from '@angular/core';
import { Moralis } from 'moralis';
import { BehaviorSubject, catchError, forkJoin, from, map, Observable, of, switchMap, throwError } from 'rxjs';

import { MoralisMainService } from './moralis-main.service';

import { CollectionOptions, NFTsOptions } from './moralis-nfts-arrays.models';

export interface CollectionData {
  token_address: any
}

@Injectable({
  providedIn: 'root'
})
export class MoralisNftService extends MoralisMainService {

  constructor() { super() }

  /* ---------------------------------------------------------------------------- */

  private choosedObject = new BehaviorSubject<any>(null);

  getChoosedObject() {
    return this.choosedObject.asObservable();
  }

  changeChoosedObject(nft: any) {
    this.choosedObject.next(nft);
  }

  /* ---------------------------------------------------------------------------- */

  /* NFT API */

  loadCollections(options: CollectionOptions[]) {     //unsub?
    const nftData: Observable<any>[] = [];
    options.forEach((item) => {
      nftData.push(this.getAllTokenIds(item).pipe(
        map((res) => {
          res?.forEach((item) => {
            if(item.metadata) {
              item.metadata = JSON.parse(item.metadata);
            } else if (!item.metadata && item.token_uri) {
              this.fetchJSON(item.token_uri).subscribe(res => {
                item.metadata = res.data
              })
            }
          });

          return res
        })
      ));
    });

    return forkJoin(nftData)

  }

  loadNFT(option: NFTsOptions) {
    return this.getTokenIdMetadata(option).pipe(
      map((res) => {
        if (res.metadata) {
          res.metadata = JSON.parse(res.metadata);
        } else if (!res.metadata && res.token_uri) {
          this.fetchJSON(res.token_uri).subscribe(data => {
            res.metadata = data.data;
          });
        }

        return res
      })
    );
  }

  loadUsersNFTs(options: CollectionOptions[]) {
    const nftData: Observable<any>[] = [];
    options.forEach((item) => {
      nftData.push(this.getUserNFTs(item).pipe(
        map((res) => {
          res.result?.forEach((item) => {
            if(item.metadata) {
              item.metadata = JSON.parse(item.metadata);
            } else if (!item.metadata && item.token_uri) {
              this.fetchJSON(item.token_uri).subscribe(res => {
                item.metadata = res.data
              })
            }
          });

          return res.result
        })
      ));
    });

    return forkJoin(nftData)
  }

  /* ---------------------------------------------------------------------------- */

  /* Query */

  getCollectionsByTags(tags: string[]) {
    const collectionData: Observable<any>[] = [];
    tags.forEach((item) => {
      collectionData.push(this.getCollectionsDBbyTag(item).pipe(
        map((res) => {
          const data: any[] = [];
          res.forEach((item) => {
            data.push({
              token_address: item.attributes['token_address'],
              collectionName: item.attributes['collectionName'],
              collectionAvatar: item.attributes['collectionAvatar']._url,
              collectionBackground: item.attributes['collectionBackground']._url,
              chain: item.attributes['chain'],
            })
          });

          return data
        })
      ));
    });

    return forkJoin(collectionData)
  }

  getCollectionsByAddress(adr: string[]) {
    const collectionData: Observable<any>[] = [];
    adr.forEach((item) => {
      collectionData.push(this.getCollectionsDBbyAddress(item).pipe(
        map((res) => {
          const data: any[] = [];
          res.forEach((item) => {
            data.push({
              token_address: item.attributes['token_address'],
              collectionName: item.attributes['collectionName'],
              collectionAvatar: item.attributes['collectionAvatar']._url,
              collectionBackground: item.attributes['collectionBackground']._url,
              chain: item.attributes['chain'],
            })
          });

          return data
        })
      ));
    });

    return forkJoin(collectionData)
  }

  /* ---------------------------------------------------------------------------- */

}
