import express from 'express';
import Hotel from '../models/hotel.js';

const router = express.Router();

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Retrive all hotels
 *     responses:
 *       200:
 *         description: A list of all hotels
 */
router.get('/', async (req,res)=>{
        let hotels = await Hotel.find();
        if(!hotels){
            return res.status(204).json({err: 'Not Results'});
        }
        return res.status(200).json(hotels);
    
    
});

/**
 *  @swagger
 *  /api/v1/hotels/{id}:
 *    get:
 *      summary: Find a hotel by its id
 *      parameters:
 *        - name: id
 *          in: path
 *          schema:
 *            type: integer
 *            required: true
 *      responses:
 *        200:
 *          description: Returns a single hotel
 *        404: 
 *          description: Not found 
 */
router.get('/:id',async (req,res)=>{
    let hotel = await Hotel.findById(req.params.id);

    if(!hotel){
        return res.status(404).json({msg:'Not Found'});
    }

    return res.status(200).json(hotel);    
});

/**
 *  @swagger
 *  /api/v1/hotels:
 *    post:
 *      summary: add new hotel from POST body
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                pricePerNight:
 *                  type: string
 *                address:
 *                  type: string
 *                link:
 *                  type: string 
 *      responses:
 *        201:
 *          description: Resources created
 *        400:
 *          description: Bad request    
 */
router.post('/', async (req,res)=>{
    try{
        await Hotel.create(req.body);
        return res.status(201); // 201: resource created
    }
    catch(err){
        return res.status(400).json({err: `Bad Request ${err}`});
    }
});


/**
 *  @swagger
 *  /api/v1/hotels/{id}:
 *    put:
 *      summary: update selected hotel from request body
 *      parameters:
 *        -name: id
 *        in: path
 *        required: true
 *        schema: 
 *          type: integer 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *                rating:
 *                  type: integer
 *                address:
 *                  type: string
 *                link:
 *                  type: string
 *      responses:
 *        204:
 *          description: Resource updated
 *        400:
 *          description: Bad request
 *        404:
 *          description: Not Found
 */
router.put('/:id',async(req,res)=>{
    try{
        let hotel = await Hotel.findById(req.params.id);  
        
        if(!hotel){
            return res.status(404).json({msg:"Not found"});
        }
        if(req.params.id != req.body._id){
            return res.status(400).json({msg:"Bad Request"});
        }
        
        await Hotel.findByIdAndUpdate(req.params.id, req.body);
        return res.status(204).json();// 204: resource was modified
    }
    catch(err){
        return res.status(400).json({err:`Bad Request: ${err}`});
    }
});

/**
 *  @swagger
 *  /api/v1/hotels/{id}:
 *    delete:
 *      summary: remove selected hotel by its id
 *      parameters:
 *        - name: id
 *          in: path
 *          schema:
 *            type: integer
 *            required: true
 *      responses:
 *        204:
 *          description: Resource updated(removed)
 *        404: 
 *          description: Not found 
 */
router.delete('/:id',async(req,res)=>{
    let hotel = await Hotel.findById(req.params.id);

    if(!hotel){
        return res.status(404).json({msg:'Not Found'});
    }

    await Hotel.findByIdAndDelete(req.params.id);
    return res.status(204).json();
});

//make controller public to rest of app 
export default router;