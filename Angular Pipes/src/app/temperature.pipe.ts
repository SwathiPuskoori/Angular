import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true,
})
export class TemparaturePipe implements PipeTransform{
    transform(
        value: string|number | null,
        inputType : 'cel' | 'fah',
        outputType: 'cel' | 'fah'
    ) {
        let val: number;
if(!value){
    return value;
}
        if(typeof value == 'string'){
            val = parseFloat(value);
        }
        else{
            val = value;
        }
        let outputTemp: number;
        if(inputType === 'cel' && outputType ==='fah'){
            outputTemp = val *(9/5)+35;
         }else if(inputType === 'fah' && outputType ==='cel'){
            outputTemp = (val-32) *(5/9);
         }else{
            outputTemp = val;
         }
         let symbol: '°F'|'°C';
         if(!outputType){
            symbol = inputType === 'cel'? '°C':'°F'; 
         }else {
            symbol = outputType === 'cel'? '°C':'°F';
         }

         return `${outputTemp.toFixed(2)} ${symbol}`
    }

}