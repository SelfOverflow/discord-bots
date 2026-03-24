import { LabelBuilder, ModalBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { MONTHS } from '@bots/utils'
import type { NumericOption } from '@bots/utils'

export const prepareOption = (option: NumericOption) => {
    return new StringSelectMenuOptionBuilder()
                .setLabel(`DAY${option.label}`)
                .setValue(`${option.value}`)
}

export const getBirthdayModal = () => {
    // Prepare a high level modal
    const modal = new ModalBuilder().setCustomId('birthday-modal').setTitle('Set your birthday 🎂')
    
    const daySelector = new TextInputBuilder()
            .setCustomId('day-select')
            .setPlaceholder('Enter the day (1-31)')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('21')
    
    const dayLabel = new LabelBuilder()
            .setLabel('Please provide your birth date')
            .setTextInputComponent(daySelector)
    
    // Prepare select option for month
    const monthSelector = new StringSelectMenuBuilder()
            .setCustomId('month-select')
            .setPlaceholder('Select the month')
            .setRequired(true)
            .addOptions(MONTHS.map(prepareOption))

    const monthLabel = new LabelBuilder()
            .setLabel('Please provide your birth month')
            .setStringSelectMenuComponent(monthSelector)

    const yearSelector = new TextInputBuilder()
            .setCustomId('year-select')
            .setPlaceholder('Select the year')
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('1998')

   const yearLabel = new LabelBuilder()
            .setLabel('Please provide your birth year')
            .setTextInputComponent(yearSelector)

    modal.addLabelComponents(dayLabel, monthLabel, yearLabel)
    return modal;
}