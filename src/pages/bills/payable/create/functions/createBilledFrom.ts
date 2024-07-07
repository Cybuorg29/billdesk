
class obj {
    adress = ''
    gstin = ''
    id = ''
    name = ''
    state = ''

    constructor(adress: string,
        gstin: string,
        id: string,
        name: string,
        state: string) {

        this.adress = adress;
        this.id = id
        this.name = name
        this.state = state
        this.gstin = gstin

    }
}


export function creatBilledFromObj(input: any): any {
    console.log(input?.adress, input?.gstin, input?._id, input?.name, input?.state)
    return new obj(input?.adress, input?.gstin, input?._id, input?.name, input?.state)
}