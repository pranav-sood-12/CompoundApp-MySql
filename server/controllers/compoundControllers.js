import ChemicalCompound from "../model/chemicalCompounds.model.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addCompound = async(req,res) => {
    const {CompoundName,CompoundDescription,strImageAttribution} = await req.body;
    const file = await req.files.strImageSource
    // console.log("hello",file);
    let compound = await ChemicalCompound.findOne({ where: { CompoundName: CompoundName } });
    // console.log("compound",compound);
    if(compound)
    {
        console.log("returned");
        return res.status(400).json({
            sucess : false,
            message : "compound already exists",
        })
    }

    // console.log(file);

    const cloudinaryResponse = await uploadOnCloudinary(file);
    console.log("cloud",cloudinaryResponse);

    compound = await ChemicalCompound.create({
        CompoundName:CompoundName,
        CompoundDescription:CompoundDescription,
        strImageSource:cloudinaryResponse.url,
        strImageAttribution:strImageAttribution
    }).catch((error)=>{
        console.log('user not added in table',error);
        return res.status(404).json({
            sucess : false,
            message : "compound not added",
        })
    })

    return res.status(201).json({
        compound,
        sucess : true,
        message : "created successfully",
    })
}

export const getCompound = async (req,res) => {
    const compoundID = await req.params.id

    let compound = await ChemicalCompound.findOne({ where: { id: compoundID } });

    if(!compound)
    {
        return res.status(404).json({
            sucess : false,
            message : "compound not exists",
        })
    }

    return res.status(201).json({
        compound,
        sucess : true,
        message : "fetched successfully",
    })
}

export const getAllCompound = async (req,res) => {
    try {
        const resultPerPage = 5;
        const numberOfCompounds = await ChemicalCompound.count();

        const apiFeatures = new ApiFeatures(ChemicalCompound.findAll(), req.query).pagination(resultPerPage);

        let compounds = await ChemicalCompound.findAll(apiFeatures.query);

        res.status(200).json({
            success: true,
            compounds,
            numberOfCompounds,
            resultPerPage
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const updatedCompound = async (req, res) => {
    const { CompoundName, CompoundDescription, strImageAttribution } = req.body;
    const compoundID = req.params.id;

    try {
        let currentCompound = await ChemicalCompound.findOne({ where: { id: compoundID } });

        let imageResponse;
        // Check if the user has uploaded a new image
        if (req.files && req.files.strImageSource) {

            const file = req.files.strImageSource;
            imageResponse = await uploadOnCloudinary(file);
        } else {

            imageResponse = currentCompound.strImageSource;
        }

        if (CompoundName !== currentCompound.CompoundName) {
            const existingCompound = await ChemicalCompound.findOne({ where: { CompoundName } });
            if (existingCompound) {
                return res.status(400).json({
                    success: false,
                    message: "Compound with this name already exists."
                });
            }
        }
        // console.log("file",imageResponse);

        await ChemicalCompound.update(
            {
                CompoundName,
                CompoundDescription,
                strImageSource: imageResponse.url,
                strImageAttribution
            },
            {
                where: { id: compoundID }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Compound updated successfully.",
            updatedCompound: {
                id: compoundID,
                CompoundName,
                CompoundDescription,
                strImageSource: imageResponse.url,
                strImageAttribution
            }
        });
    } catch (error) {
        console.error("Error updating compound:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }


    

}
