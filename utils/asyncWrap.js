function asyncWrap(f){
    return function(req, res, next){
        f(req, res, next).catch(err=>{
            next(err);
        });
    };
        
}
module.exports=asyncWrap;