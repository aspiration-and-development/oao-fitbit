function mySettings(props: {settings: any}) {
    const { settings } = props
    return (
        <Page>
            <Select
                label="Type"
                settingsKey="level"
                options={[
                    {
                        name: "Simple, just numbers.",
                        value: 'simple',
                    },
                    {
                        name: "Latin America.",
                        value: 'latin'
                    },
                    {
                        name: "Spain.",
                        value: 'spain'
                    }]
                }
            />
            <Select
                label="Style"
                settingsKey="style"
                options={[
                    {
                        name: "Plain",
                        value: 'plain'
                    },
                    {
                        name: "Color",
                        value: 'color'
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
