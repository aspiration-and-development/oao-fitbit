function mySettings(props: {settings: any}) {
    const { settings } = props
    return (
        <Page>
            <Select
                label="I want time like..."
                settingsKey="level"
                options={[
                    {
                        name: "Simple, numbers.",
                        value: 'simple'
                    },
                    {
                        name: "In Latin America.",
                        value: 'latin'
                    },
                    {
                        name: "In Spain.",
                        value: 'spain'
                    }]
                }
            />
            <Toggle
                settingsKey="military"
                label="Use military time (24 hours)"
            />
        </Page>
    );
}

registerSettingsPage(mySettings);
