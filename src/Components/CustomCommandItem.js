import React from 'react';
import {View, Text} from 'react-native';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

function CommandItem(props) {
    console.log('props',props)
  const {cmd, resp, onDelete, onEdit, readOnly} = props;
    console.log('resp',resp)
  const wrapperStyle = {
    marginBottom: 10,
    padding: 5,
    borderRadius: 2,
    backgroundColor: 'white',
  };

  let innerElem = null;

  if (cmd.type === 'command') {
    innerElem = (
      <View style={{flex: 1}}>
        <Text style={{marginRight: 5, color: 'gray'}}>TRANSCEIVE</Text>
        <Text>
          {cmd.payload.reduce((acc, byte) => {
            return (
              acc + ('00' + byte.toString(16).toUpperCase()).slice(-2) + ' '
                // acc + (byte.toString().length === 1 ? `0${byte}`: byte )+ ' '
            );
          }, '')}
        </Text>
        {Array.isArray(resp) && (
          <>
            <Text style={{marginRight: 5, color: 'gray'}}>RESPONSE</Text>
            <Text>
              {resp.reduce((acc, byte) => {
                return (
                  acc + ('00' + byte.toString(16).toUpperCase()).slice(-2) + ' '
                    // acc + (byte.toString().length === 1 ? `0${byte}`:byte) + ' '
                );
              }, '')}
            </Text>
          </>
        )}
      </View>
    );
  } else {
    innerElem = (
      <>
        <Text style={{marginRight: 5, color: 'gray'}}>
          {cmd.type.toUpperCase()}
        </Text>
        <Text style={{flex: 1}}>{cmd.payload}</Text>
      </>
    );
  }

  return (
    <View style={[wrapperStyle, {flexDirection: 'row', alignItems: 'center'}]}>
      {innerElem}

      {!readOnly && (
        <IconButton
          icon={() => <Icon name="edit" size={22} />}
          onPress={onEdit}
        />
      )}

      {!readOnly && (
        <IconButton
          icon={() => <Icon name="delete" size={22} />}
          onPress={onDelete}
        />
      )}
    </View>
  );
}

export default CommandItem;
