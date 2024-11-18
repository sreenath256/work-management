import Joi from "joi"
import priorityHelpers from "../helpers/priorityHelpers.js"
import userHelpers from "../helpers/userHelpers.js"
import notificationHelpers from "../helpers/notificationHelpers.js"


const priorityControllers = () => {

    const addOption = async (req, res) => {
        try {
            const optionSchema = Joi.object({
                option: Joi.string()
                    .min(1)
                    .max(18)
                    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
                    .required(),
                color: Joi.string()
                    .length(7)
                    .required()
            })
            const { error, value } = optionSchema.validate(req.body)

            if (error) {
                return res.status(200).json({ status: false, message: error.details[0].message })
            }

            value.option = value.option.toLowerCase()
            const optionExists = await priorityHelpers.findOptionByName(value.option)
            if (optionExists) {
                return res.status(200).json({ status: false, message: "Option already exists" })
            }

            const assigner = req.payload.id
            const [optionResponse,userNotificationResponse,notificationResponse] = await Promise.all(
                [
                    priorityHelpers.addOption(value),
                    userHelpers.addNotificationCount(assigner),
                    notificationHelpers.addNotification({assigner,notification:`added new priority option : ${value.option}`})
                ]
            )

            if (optionResponse && notificationResponse) {
                return res.status(200).json({ status: true, message: "Option added", data: optionResponse, notification: notificationResponse})
            }
            return res.status(200).json({ status: false, message: "Error adding option" })
        } catch (error) {
            return res.status(500).json({ status: false, message: "Internal error" })
        }
    }

    const getOptions = async (req, res) => {
        try {
            const getResponse = await priorityHelpers.getAllOptions()
            return res.status(200).json({ status: true, data: getResponse })
        } catch (error) {
            return res.status(500).json({ status: false, message: "Internal error" })
        }
    }


    return {
        addOption,
        getOptions
    }
}

export default priorityControllers;