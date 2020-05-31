
function mySettings(props: {settings: any}) {
    const { settings } = props
    return (
        <Page>
            <Toggle
                settingsKey="showDay"
                label="Day of the week"
            />
        </Page>
    );
}

registerSettingsPage(mySettings);
