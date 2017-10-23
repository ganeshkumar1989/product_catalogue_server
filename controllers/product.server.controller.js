import mongoose from 'mongoose';
//import models
import Product from '../models/product.server.model';

const authHeader = 'Bearer adminToken';
export const getProducts = (req,res) => {
    if (req.headers && req.headers.authorization === authHeader) {
        Product.find().exec((err,products) => {
            if(err){
                return res.json({'success':false,'message':'Error retriving products'});
            }
            return res.json({'success':true,'message':'Products fetched successfully',products});
        });
    }
    else{
        return res.json({'success':false,'message':'Unauthorized'});
    }
}

export const addProduct = (req,res) => {
    if (req.headers && req.headers.authorization === authHeader) {
        const newProduct = new Product(req.body);
        newProduct.save((err,product) => {
            if(err){
                return res.json({'success':false,'message':'Error adding product'});
            }
            return res.json({'success':true,'message':'Product added successfully',product});
        })
    }
    else{
        return res.json({'success':false,'message':'Unauthorized'});
    }
}

export const updateProduct = (req,res) => {
    if (req.headers && req.headers.authorization === authHeader) {
        Product.findOneAndUpdate({ code:req.body.code }, req.body, { new:true }, (err,product) => {
            if(err){
                return res.json({'success':false,'message':'Error updating product','error':err});
            }
            return res.json({'success':true,'message':'Updated successfully',product});
        })
    }
    else{
        return res.json({'success':false,'message':'Unauthorized'});
    }
}

export const getProduct = (req,res) => {
    if (req.headers && req.headers.authorization === authHeader) {
        Product.find({code:req.params.code}).exec((err,product) => {
            if(err){
                return res.json({'success':false,'message':'Error retriv=eving product'});
            }
            if(product.length){
                return res.json({'success':true,'message':'Product fetched by id successfully',product});
            }
            else{
                return res.json({'success':false,'message':'Product with the given id not found'});
            }
        })
    }
    else{
        return res.json({'success':false,'message':'Unauthorized'});
    }
}

export const deleteProduct = (req,res) => {
    if (req.headers && req.headers.authorization === authHeader) {
        Product.findOneAndRemove({ code: req.params.code }, (err,product) => {
            if(err){
                return res.json({'success':false,'message':'Error deleting product'});
            }
            if(product){
                return res.json({'success':true,'message':product.name+' deleted successfully'});
            }
            else{
                return res.json({'success':true,'message':'Produce not found'});
            }

        })
    }
    else{
        return res.json({'success':false,'message':'Unauthorized'});
    }
}