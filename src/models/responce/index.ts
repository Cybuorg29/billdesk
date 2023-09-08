

export type   responceObj = {
    message:string
} & ({
    code:200,
    package:any
}|{
    code:500 | 400 | 404 
    error:string
})