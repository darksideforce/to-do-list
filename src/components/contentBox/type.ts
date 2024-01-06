type cardBoxItem  = {
    type:'error' | 'warning' | 'timeout' | 'timing',
    time:number,
    desrciption:string,
    content:string,
    drift:number,
    scale:number, 
}
export type {cardBoxItem}