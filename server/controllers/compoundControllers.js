import ChemicalCompound from "../model/chemicalCompounds.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const addCompound = async(req,res) => {
    const {CompoundName,CompoundDescription,strImageAttribution} = await req.body;
    const file = await req.files.strImageSource
    let compound = await ChemicalCompound.findOne({ where: { CompoundName: CompoundName } });
    if(compound)
    {
        return res.status(500).json({
            sucess : false,
            message : "compound already exists",
        })
    }

    // console.log(file);

    const cloudinaryResponse = await uploadOnCloudinary(file);
    // console.log(cloudinaryResponse);

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
    let compound = await ChemicalCompound.findAll();

    if(!compound)
    {
        return res.status(404).json({
            sucess : false,
            message : "compound not fetched",
        })
    }

    return res.status(201).json({
        compound,
        sucess : true,
        message : "fetched successfully",
    })
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
