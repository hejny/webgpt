import { randomItem } from '../../utils/randomItem';

/**
 * @@
 */
export function AigenSimple() {
    return (
        <div
            style={{
                zIndex: 99999999,
                position: 'absolute',
                top: 0,
                right: 0,
            }}
        >
            <a href="#" /* <- TODO: !!! Create web which will explain how is the web AI generated */>
                {randomItem(<div style={{ marginRight: 5 }}>← Made By AI</div>)}
            </a>
        </div>
    );
}
