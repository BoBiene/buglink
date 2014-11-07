package ut.com.episerver.buglink;

import org.junit.Test;
import com.episerver.buglink.MyPluginComponent;
import com.episerver.buglink.MyPluginComponentImpl;

import static org.junit.Assert.assertEquals;

public class MyComponentUnitTest
{
    @Test
    public void testMyName()
    {
        MyPluginComponent component = new MyPluginComponentImpl(null);
        assertEquals("names do not match!", "myComponent",component.getName());
    }
}