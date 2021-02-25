const Category=require('../models/category');

//to get specific category by params(id)
exports.getCatagoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err)
        {   return res.status(400).json({
                error: "Category is not in DB"
            })
        }
        req.category=cate;
        next();
    })
}

//for creating category
exports.createCategory=(req,res)=>{
    let category= new Category(req.body);
    category.save((err,cate)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Category is not created in DB"
            })
        }
        res.json({category});
    })
};

//to show
exports.getCategory=(req,res)=>{
    res.json(req.category);
}
//to show all categories
exports.getAllCategory=(req,res) => {
    Category.find().exec((err,categories)=>{
        if(err)
        {
            return res.status(400).json({
                error: "No categories found"
            })
        }
        res.json(categories);
    });
};

//update category
exports.updateCategory=(req,res)=>{
    const category = req.category;
    category.name= req.body.name;

    category.save((err,updatedCategory)=>{
        if(err)
        {
            return res.status(400).json({
                error: "No category found"
            })
        }
        res.json(updatedCategory);
    });
};

//delete catagory
exports.removeCategory=(req,res)=>{
    const category= req.category;

    category.remove((err,category)=>{
        if(err)
        {
            return res.status(400).json({
                error: "Failed to delete this category"
            })
        }
        res.json({
            message: "Successfully deleted"
        })
    })
}