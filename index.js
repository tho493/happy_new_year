const express = require("express");
const fileUpload = require('express-fileupload');
const path = require('path');
const {
    saveData,
    getData,
    uploadImage,
    deleteImage
} = require('./database')
require('dotenv').config();

// Config app
const app = express();
const port = 3000;
const api_key = process.env.API_KEY || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// Middleware
app.use(express.static('view'))
app.set('view engine', 'ejs');
app.set('views', __dirname + '/view')
app.use(fileUpload());

// Routes
// API
app.post("/api/v1/saveData", async (req, res) => {
    try {
        // Kiểm tra header API key 
        const apiKey = req.headers['x-api-key'];
        if (!apiKey || apiKey !== process.env.API_KEY) {
            return res.status(401).json({
                error: 1,
                message: "Unauthorized - Invalid API key"
            });
        }

        // Validate input
        if (!req.body || !req.body.name || !req.body.title || !req.body.content) {
            return res.status(400).json({
                error: 1,
                message: "Thiếu thông tin cần thiết"
            });
        }

        const {
            name,
            title,
            content,
            theme_id,
            countdown_id
        } = req.body;

        // Validate độ dài input
        if (name.length > 100 || title.length > 200 || content.length > 1000) {
            return res.status(400).json({
                error: 1,
                message: "Độ dài nội dung vượt quá giới hạn cho phép"
            });
        }

        let imageToSave = null;
        let imagesToSave = [];

        if ((theme_id === '01' || theme_id === '03')  && (req.files || req.files.image)) {
            const imageFile = req.files.image;

            const uploadResult = await uploadImage(imageFile.data);
            imageToSave = uploadResult;
        }

        let images = [];
        for (let i = 0; i < 4; i++) {
            if (req.files[`images-${i}`]) {
                images.push(req.files[`images-${i}`]);
            }
        }
        if (theme_id === '03' && images.length > 0) {

            for (const i of images) {
                const uploadResult = await uploadImage(i.data);
                imagesToSave.push(uploadResult);
            }
        }

        const data = {
            name,
            title,
            content,
            image: theme_id === '01' || theme_id === '03' ? imageToSave : null,
            images: theme_id === '03' ? imagesToSave : null,
            theme_id,
            countdown_id
        };

        const result = await saveData(data);

        if (result.error !== 0) {
            if (theme_id === '01' && imageToSave) {
                console.log('Deleting image', imageToSave);
                await deleteImage(imageToSave);
            }
            if (theme_id === '03' && imagesToSave.length > 0) {
                for (const imageUrl of imagesToSave) {
                    console.log('Deleting image', imageUrl);
                    await deleteImage(imageUrl);
                }
            }
            return res.status(400).json(result);
        }

        return res.status(200).json({
            error: 0,
            id: result.id
        });

    } catch (error) {
        return res.status(500).json({
            error: 1,
            message: error.message
        });
    }
});

app.get("/api/v1/getData/:id", async (req, res) => {
    try {
        // Check API key
        const apiKey = req.headers['x-api-key'];
        if (!apiKey || apiKey !== process.env.API_KEY) {
            return res.status(401).json({
                error: 1,
                message: "Unauthorized - Invalid API key"
            });
        }

        const id = req.params.id;
        const result = await getData(id);

        if (result.error !== 0) {
            return res.status(404).json(result);
        }

        return res.status(200).json({
            error: 0,
            data: result.data
        });

    } catch (error) {
        return res.status(500).json({
            error: 1,
            message: error.message
        });
    }
});

// WEB
app.get("/", (req, res) => {
    res.status(200).render("home", {
        api_key
    });
})

app.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const wishData = await getData(id);
        if (wishData.error != 0) {
            return res.status(404).render("error", {
                "warning_number": 404,
                "warning_message": wishData.message
            });
        } else {
            const countdownId = wishData.data.countdown_id || '01';
            return res.status(200).render(`countdown/${countdownId}/index`, {
                data: wishData.data
            })
        }
    } catch (error) {
        return res.status(500).render("error", {
            "warning_number": 500,
            "warning_message": error
        });
    }
});

app.get("/hny/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const wishData = await getData(id);
        if (wishData.error != 0) {
            return res.status(404).render("error", {
                "warning_number": 404,
                "warning_message": wishData.message
            });
        } else {
            const themeId = wishData.data.theme_id || "01";
            return res.status(200).render(`theme/${themeId}/index`, {
                data: wishData.data
            });
        }
    } catch (error) {
        return res.status(500).render("error", {
            "warning_number": 500,
            "warning_message": error
        });
    }
});

app.use((req, res, next) => {
    res.status(404).render("error", {
        "warning_number": 404,
        "warning_message": "Trang bạn truy cập không tồn tại"
    });
});

const listener = app.listen(process.env.PORT || port, () =>
    console.log(`Đã mở tại port: http://localhost:${listener.address().port}`)
);