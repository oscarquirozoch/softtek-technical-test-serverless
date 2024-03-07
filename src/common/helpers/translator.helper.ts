import { ATTRIBUTE_TRANSLATION } from "../constants/attribute-translation.constant";

export class TranslatorHelper {

    static arrayOfObjects(data: Array<object>) {
        return data.map((item: object) => {
            let newItem = {};
            for (const [key, value] of Object.entries(item)) {
                if (key in ATTRIBUTE_TRANSLATION) {
                    newItem[ATTRIBUTE_TRANSLATION[key]] = value;
                } else {
                    newItem[key] = value;
                }
            }
            return newItem;
        });
    }

}