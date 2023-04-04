import PropTypes from 'prop-types';
import ThemeContrast from './ThemeContrast';
import ThemeRtlLayout from './ThemeRtlLayout';
import ThemeColorPresets from './ThemeColorPresets';

// ----------------------------------------------------------------------

ThemeSettings.propTypes = {
  children: PropTypes.node,
};

export default function ThemeSettings({ children }) {
  return (
    <ThemeColorPresets>
      <ThemeContrast>
        <ThemeRtlLayout>
          {children}
        </ThemeRtlLayout>
      </ThemeContrast>
    </ThemeColorPresets>
  );
}
