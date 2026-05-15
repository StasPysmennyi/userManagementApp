import { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

import DateTimePickerModal, {
  type DateTimePickerChangeEvent,
} from '@react-native-community/datetimepicker';
import { formatDate } from '@uma/shared';

import { Icons } from 'src/components';

import styles from './styles';

type Props = {
  label?: string;
  value?: string;
  error?: string;
  onChange: (iso: string) => void;
  onClear?: () => void;
};

const DatePicker = ({ label, value, error, onChange, onClear }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = value ? new Date(value) : new Date();

  const toggleOpen = () => setIsOpen(prev => !prev);

  const handleValueChange = (_event: DateTimePickerChangeEvent, date: Date) => {
    if (Platform.OS === 'android') {
      setIsOpen(false);
    }
    onChange(date.toISOString());
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        onPress={toggleOpen}
        activeOpacity={0.75}
        style={[styles.trigger, error ? styles.triggerError : null]}>
        <Text style={[styles.triggerText, !value && styles.placeholder]}>
          {value ? formatDate(value) : 'Select date (optional)'}
        </Text>

        {value && onClear && (
          <TouchableOpacity
            onPress={onClear}
            hitSlop={8}
            style={styles.clearBtn}>
            <Icons.CloseIcon width={14} height={14} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      {isOpen && (
        <DateTimePickerModal
          value={currentDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onValueChange={handleValueChange}
          onDismiss={toggleOpen}
        />
      )}
    </View>
  );
};

export default DatePicker;
