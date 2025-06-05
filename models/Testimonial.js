const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
    videoId: { type: String, require: true },
    name: { type: String, require: true },
    age: { type: Number, require: true },
    location: { type: String, require: true },
    treatment: { type: String, require: true },
    comment: { type: String, required: true },
    recovery: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
// {
//     videoId: "LHVLrZJHJHk",
//         name: "Aarti Devi",
//             age: "52",
//                 location: "Mumbai",
//                     treatment: "Physiotherapy & Pain Management",
//                         rating: 5,
//                             comment: "The treatments at Swasthhyam truly changed my life. I regained mobility and feel healthier than ever. Thank you to the amazing team!",
//                                 recovery: "3 months",
//                                     thumbnail: `https://img.youtube.com/vi/LHVLrZJHJHk/maxresdefault.jpg`
// },