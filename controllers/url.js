const {nanoid} = require("nanoid");
const URL = require("../models/url");


async function handleGenerateNewShortURL(req, res){
    // console.log("triggered");
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "URL is Required"});
    const shortID = nanoid(12);
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    // return res.status(201).json({id: shortID, message: `ShortID generated successfully`});
    return res.render("home", {
        id: shortID,

    });
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortID;
    const result = await URL.findOne({shortId});
    if(!result) return res.status(404).json({ ERROR : 404, messgae: `No Results Found for ${shortId}`});
    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}