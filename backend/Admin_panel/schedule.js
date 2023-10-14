const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
    unique: true
  },
  schedule: [
    {
      day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      slots: [
        {
          type: { type: String, enum: ['regular', 'break'], required: true }, // Type of slot: regular or break
          startTime: { type: String, required: true }, // Start time of the slot
          endTime: { type: String, required: true } // End time of the slot
        }
      ]
    }
  ]
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;