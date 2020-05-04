
function mySettings(props: {settings: any}) {
    const { settings } = props
    return (
        <Page>
            <Toggle
                settingsKey="mostrarDia"
                label="Day of the week"
            />
        </Page>
    );
}

registerSettingsPage(mySettings);
