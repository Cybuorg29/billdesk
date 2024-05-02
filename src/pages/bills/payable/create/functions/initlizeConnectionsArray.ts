export default function InitliseConnectionsArray(inputArray: any[]): any {
    let newConnectionsArray: any[] = [];
    inputArray.map((value: any) => {
        if (newConnectionsArray.length === 0) return newConnectionsArray.push(value);
        let found = false;
        newConnectionsArray.map((index: any) => {
            if (index.name === value.name) found = true;

        })
        if (!found) newConnectionsArray.push(value);

    })



    return newConnectionsArray;



}